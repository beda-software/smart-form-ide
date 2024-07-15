import { isFailure, isSuccess, success } from "@beda.software/remote-data";
import { Parameters, Questionnaire, QuestionnaireResponse, OperationOutcome, Patient, Practitioner, Encounter} from "fhir/r4b";
import { service } from "web/src/services/fhir";
import {populateQuestionnaire } from "@aehrc/sdc-populate"
import { extractErrorDescription } from "@beda.software/fhir-react";

async function fetchResource(query: string, _requestConfig?: any){
    const response = await service({url: query})
    console.log(response)

    if(isSuccess(response)){
        return response.data;
    } else if(isFailure(response)) {
        throw new Error(extractErrorDescription(response.error))
    }
}

function getParam(parameters: Parameters, name: string){
    const param = parameters.parameter?.find(p => p.name === name);
    if(param){
        return param.resource;
    }
}

export async function populate(launchContext: Parameters) {
    const questionnaire: Questionnaire = getParam(launchContext, "questionnaire")! as any as Questionnaire;
    const patient: Patient = getParam(launchContext, "patient")! as Patient;
    const user: Practitioner = getParam(launchContext, "user")! as Practitioner;
    const encounter: Encounter = getParam(launchContext, "encounter")! as Encounter;
    const {populateResult } = await populateQuestionnaire({ questionnaire, fetchResourceCallback: fetchResource, patient, user, encounter });
    if(populateResult.issues){
        console.warn(JSON.stringify(populateResult.issues))
    }
    // console.log("population result ", populateResult.populatedResponse)
    return success(populateResult.populatedResponse);
}

export async function assemble(questionnaireId:string){
    const response = await service<Questionnaire>({
        method: 'GET',
        url: `Questionnaire/${questionnaireId}`,
    });

    return response;
}
