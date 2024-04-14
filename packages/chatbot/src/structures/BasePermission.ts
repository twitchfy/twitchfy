import type { CommandContext } from './CommandContext';
import type { EventSubConnection } from '../enums';

/**
 * Base class for building custom permissions.
 */
export abstract class BasePermission<T extends EventSubConnection> {
    
    /**
     * Check if the user has the custom permission to run the command.
     * @param ctx The context of the command which was run.
     * @returns If the user has the custom permission to run the command.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    abstract check(ctx: CommandContext<{}, T>): Promise<boolean> | boolean;

    /**
     * The value or identifier of the custom permission returned in `onPermissionsFallback`. See {@link Command}.
     */
    abstract value: string;

}