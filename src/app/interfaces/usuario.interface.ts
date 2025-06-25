
/* eslint-disable @typescript-eslint/naming-convention */
export class UserDataInterface {

  constructor(
    public Id?:            number,
    public BirthDate?:     null,
    public  Surnames?:      string,
    public Address?:       null,
    public Phone?:         null,
    public Photo?:         null,
    public IsActive?:      boolean,
    public Type?:          number,
    public IsDiseased?:    boolean,
    public Name?:          string,
    public Description?:   string,
    public RelatedPerson?: any,
    public Patient?:       any,
    public Practitioner?:  any
  ) {}

}
