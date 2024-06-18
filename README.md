# smart-form-ide

## Live demo environment

[https://ide.au-core.beda.software/AboriginalTorresStraitIslanderHealthCheck?client=sdc-ide](https://ide.au-core.beda.software/AboriginalTorresStraitIslanderHealthCheck?client=sdc-ide)

Use 
```
username: admin   
password: password
``` 
to authorize.

## Local development
Setup dependencies
```
git submodule update --init
yarn
```
Start dev server
```
yarn start
```
Launch application [http://localhost:3001/AboriginalTorresStraitIslanderHealthCheck?client=sdc-ide-local](http://localhost:3001/AboriginalTorresStraitIslanderHealthCheck?client=sdc-ide-local)   
Use 
```
username: admin   
password: password
``` 
to authorize.

Mapper sample
```
map "http://emr.beda.software/StructureMap/extract-patient" = "extract-patient"

uses "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse" as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group patientMap(source src : QuestionnaireResponse, target patient : Patient) {
    src.item as item where linkId = 'fd5af92e-c248-497a-8007-ee0952ccd4d9' -> patient.name = create("HumanName") as name then {
        item.item as nItem where linkId = '5b224753-9365-44e3-823b-9c17e7394005' -> name.family = (%nItem.item.answer.value) ;
    };
}
```



