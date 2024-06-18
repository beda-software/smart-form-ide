import { success } from "@beda.software/remote-data";
import { Parameters, Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { service } from "web/src/services/fhir";

export function populate(_launchContext:Parameters) {
    const result: QuestionnaireResponse = {
        resourceType: "QuestionnaireResponse",
        status: 'in-progress',
    }
    return Promise.resolve(success(result));
}

export async function assemble(questionnaireId:string){
    const response = await service<Questionnaire>({
        method: 'GET',
        url: `Questionnaire/${questionnaireId}`,
    });

    return response;
}
