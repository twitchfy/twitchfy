import type { AutoModSettingsOptions } from '../interfaces';


export class AutoModSettingsBody{
  public overall_level?: number;
  public disability?: number;
  public aggression?: number;
  public sexuality_sex_or_gender?: number;
  public misogyny?: number;
  public bullying?: number;
  public swearing?: number;
  public race_ethnicity_or_religion?: number;
  public sex_based_terms?: number;
  public constructor(options: AutoModSettingsOptions){
    this.overall_level = options.overallLevel;
    this.disability = options.disability;
    this.aggression = options.aggression;
    this.sexuality_sex_or_gender = options.sexOrGen;
    this.misogyny = options.misogyny;
    this.bullying = options.bullying;
    this.swearing = options.swearing;
    this.race_ethnicity_or_religion = options.ethnicityOrReligion;
    this.sex_based_terms = options.sexBasedTerms;
  }
}