import {
    BaseRenderer,
    RendererThemeProvider,
    useBuildForm,
    useQuestionnaireResponseStore,
    useRendererQueryClient
} from '@aehrc/smart-forms-renderer';
import { QueryClientProvider } from '@tanstack/react-query';
import { Questionnaire, QuestionnaireResponse } from 'fhir/r4';
import { useEffect } from 'react';
import { RenderRemoteData } from 'web/src/components/RenderRemoteData';

import { sequenceMap } from '@beda.software/remote-data';
import { formatError } from '@beda.software/fhir-react';


import { useDebounce } from './utils';
import { QRFormWrapperProps } from "web/src/containers/Main/types";


interface YourBaseRendererWrapperProps {
    questionnaire: Questionnaire;
    questionnaireResponse: QuestionnaireResponse;
    saveQuestionnaireResponse: (resource: QuestionnaireResponse) => void;
}

function YourBaseRendererWrapper(props: YourBaseRendererWrapperProps) {
    const { questionnaire, questionnaireResponse, saveQuestionnaireResponse } = props;

    // The renderer needs a query client to make API calls
    const queryClient = useRendererQueryClient();

    // This hook builds the form based on the questionnaire
    const isBuilding = useBuildForm(questionnaire, questionnaireResponse);
    const formQR = useDebounce(useQuestionnaireResponseStore.use.updatableResponse(), 500)

    useEffect(() => {
        saveQuestionnaireResponse(formQR)
    }, [formQR, saveQuestionnaireResponse]);

    if (isBuilding) {
        return <div>Loading...</div>;
    }

    return (
        <RendererThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BaseRenderer />
            </QueryClientProvider>
        </RendererThemeProvider>
    );
}

export function AEHRCFormWrapper({
    questionnaireRD,
    questionnaireResponseRD,
    saveQuestionnaireResponse,
}: QRFormWrapperProps) {
    const remoteDataResult = sequenceMap({
        questionnaireRD,
        questionnaireResponseRD,
    });

    return (
        <RenderRemoteData
            remoteData={remoteDataResult}
            renderFailure={(errors: Error[]) => {
                return <p>{errors.map((e) => formatError(e)).join(',')}</p>;
            }}
        >
            {(data) => (
                <YourBaseRendererWrapper
                    questionnaire={data.questionnaireRD as Questionnaire}
                    questionnaireResponse={data.questionnaireResponseRD as QuestionnaireResponse}
                    saveQuestionnaireResponse={saveQuestionnaireResponse as YourBaseRendererWrapperProps['saveQuestionnaireResponse']}
                />
            )}
        </RenderRemoteData>);
}
