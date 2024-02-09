import type { PutAutoModSettings } from '@twitchapi/api-types';
import type { AutoModSettingsOptions } from '../interfaces';


export class AutoModSettingsBody implements PutAutoModSettings{
  public overall_level: number | null;
  public disability: number;
  public aggression: number;
  public sexuality_sex_or_gender: number;
  public misogyny: number;
  public bullying: number;
  public swearing: number;
  public race_ethnicity_or_religion: number;
  public sex_based_terms: number;
  public constructor(data: AutoModSettingsOptions){
    this.overall_level = data.overallLevel;
    this.disability = data.disability;
    this.aggression = data.aggression;
    this.sexuality_sex_or_gender = data.sexOrGen;
    this.misogyny = data.misogyny;
    this.bullying = data.bullying;
    this.swearing = data.swearing;
    this.race_ethnicity_or_religion = data.ethnicityOrReligion;
    this.sex_based_terms = data.sexBasedTerms;
  }
}