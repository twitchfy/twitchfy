
export function parseMessage(message: string, query: "tags" | "parameters" | "source" | "command"): string {

    let idx = 0;


    let rawTagsComponent : string = ""
    let rawSourceComponent : string = ""
    let rawCommandComponent : string = ""
    let rawParametersComponent : string = ""


    if (message[idx] === '@') {
        let endIdx = message.indexOf(' ');
        rawTagsComponent = message.slice(1, endIdx);
        idx = endIdx + 1;
    }

    if (message[idx] === ':') {
        idx += 1;
        let endIdx = message.indexOf(' ', idx);
        rawSourceComponent = message.slice(idx, endIdx);
        idx = endIdx + 1;
    }


    let endIdx = message.indexOf(':', idx);
    if (-1 == endIdx) {
        endIdx = message.length;
    }

    rawCommandComponent = message.slice(idx, endIdx).trim();


    if (endIdx != message.length) {
        idx = endIdx + 1;
        rawParametersComponent = message.slice(idx);
        rawCommandComponent.slice(0, -2)
    }


    if (query === "tags") return rawTagsComponent;
    if (query === "parameters") return rawParametersComponent;
    if (query === "command") return rawCommandComponent;
    if (query === "source") return rawSourceComponent;

    return "";
}


// Parses the tags component of the IRC message.

export function parseTags(message: string) {


    const tags = parseMessage(message, "tags")

    if(!tags) return { }



    // badge-info=;badges=broadcaster/1;color=#0000FF;...

    const tagsToIgnore = {  // List of tags to ignore.
        'client-nonce': null,
        'flags': null
    };

    let dictParsedTags = {};  // Holds the parsed list of tags.
    // The key is the tag's name (e.g., color).
    let parsedTags = tags.split(';');

    parsedTags.forEach(tag => {
        let parsedTag = tag.split('=');  // Tags are key/value pairs.
        let tagValue = (parsedTag[1] === '') ? null : parsedTag[1];

        switch (parsedTag[0]) {  // Switch on tag name
            case 'badges':
            case 'badge-info':
                // badges=staff/1,broadcaster/1,turbo/1;

                if (tagValue) {
                    let dict = {};  // Holds the list of badge objects.
                    // The key is the badge's name (e.g., subscriber).
                    let badges = tagValue.split(',');
                    badges.forEach(pair => {
                        let badgeParts = pair.split('/');
                        dict[badgeParts[0]] = badgeParts[1];
                    })
                    dictParsedTags[parsedTag[0]] = dict;
                }
                else {
                    dictParsedTags[parsedTag[0]] = null;
                }
                break;
            case 'emotes':
                // emotes=25:0-4,12-16/1902:6-10

                if (tagValue) {
                    let dictEmotes = {};  // Holds a list of emote objects.
                    // The key is the emote's ID.
                    let emotes = tagValue.split('/');
                    emotes.forEach(emote => {
                        let emoteParts = emote.split(':');

                        let textPositions: { startPosition: string, endPosition: string }[] = [];  // The list of position objects that identify
                        // the location of the emote in the chat message.
                        let positions = emoteParts[1].split(',');
                        positions.forEach(position => {
                            let positionParts = position.split('-') as string[];
                            textPositions.push({
                                startPosition: positionParts[0],
                                endPosition: positionParts[1]
                            })
                        });

                        dictEmotes[emoteParts[0]] = textPositions;
                    })

                    dictParsedTags[parsedTag[0]] = dictEmotes;
                }
                else {
                    dictParsedTags[parsedTag[0]] = null;
                }

                break;
            case 'emote-sets':
                // emote-sets=0,33,50,237

                let emoteSetIds = tagValue?.split(',');  // Array of emote set IDs.
                dictParsedTags[parsedTag[0]] = emoteSetIds;
                break;
            default:
                // If the tag is in the list of tags to ignore, ignore
                // it; otherwise, add it.

                if (tagsToIgnore.hasOwnProperty(parsedTag[0])) {
                    ;
                }
                else {
                    dictParsedTags[parsedTag[0]] = tagValue;
                }
        }
    });


    return dictParsedTags;
}

// Parses the command component of the IRC message.

export function parseCommand(message) : { channel: string, command: string, isCapRequestEnabled?: boolean } {

    const rawCommandComponent = parseMessage(message, "command")
    let parsedCommand: { command: string, channel: string, isCapRequestEnabled?: boolean } =  { command: "", channel: "" };
    const commandParts = rawCommandComponent.split(' ');


    switch (commandParts[0]) {
        case 'JOIN':
        case 'PART':
        case 'NOTICE':
        case 'CLEARCHAT':
        case 'CLEARMSG':
        case 'HOSTTARGET':
        case 'PRIVMSG':
            parsedCommand = {
                command: commandParts[0],
                channel: commandParts[1]
            }
            break;
        case 'PING':
            parsedCommand = {
                command: commandParts[0],
                channel: ""
            }
            break;
        case 'CAP':
            parsedCommand = {
                command: commandParts[0],
                isCapRequestEnabled: (commandParts[2] === 'ACK') ? true : false,
                channel: ""
                // The parameters part of the messages contains the 
                // enabled capabilities.
            }
            break;
        case 'GLOBALUSERSTATE':
            // Included only if you request the /commands capability.
            // But it has no meaning without also including the /tags capability.
            parsedCommand = {
                command: commandParts[0],
                channel: ""
            }
            break;
        case 'USERSTATE':   // Included only if you request the /commands capability.
        case 'ROOMSTATE':   // But it has no meaning without also including the /tags capabilities.
            parsedCommand = {
                command: commandParts[0],
                channel: commandParts[1]
            }
            break;
        case 'RECONNECT':
            parsedCommand = {
                command: commandParts[0],
                channel: ""
            }
            break;;
        case '001':  // Logged in (successfully authenticated). 
            parsedCommand = {
                command: commandParts[0],
                channel: commandParts[1]
            }
            break;
    }

    return parsedCommand;
}

// Parses the source (nick and host) components of the IRC message.

export function parseSource(message) {

    const rawSourceComponent = parseMessage(message, "source")
    if (null == rawSourceComponent) {  // Not all messages contain a source
        return null;
    }
    else {
        let sourceParts = rawSourceComponent.split('!');
        return {
            nick: (sourceParts.length == 2) ? sourceParts[0] : null,
            host: (sourceParts.length == 2) ? sourceParts[1] : sourceParts[0]
        }
    }
}

// Parsing the IRC parameters component if it contains a command (e.g., !dice).

export function parseParameters(message: string, command) {

    const rawParametersComponent = parseMessage(message, "parameters")
    let idx = 0
    let commandParts = rawParametersComponent!.slice(idx + 1).trim();
    let paramsIdx = commandParts.indexOf(' ');

    if (-1 == paramsIdx) { // no parameters
        command.botCommand = commandParts.slice(0);
    }
    else {
        command.botCommand = commandParts.slice(0, paramsIdx);
        command.botCommandParams = commandParts.slice(paramsIdx).trim();
        // TODO: remove extra spaces in parameters string
    }

    return command;
}

