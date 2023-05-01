import Lang from '../../../lib/filters/lang';
import { IValidationStatus } from '../../../store/validation';
import Routes from '../../../lib/mixins/Routes';
import { IBlock, IFlow, IResource } from '@floip/flow-runner';
import { ErrorObject } from 'ajv';
declare const ErrorNotifications_base: import("vue-class-component/lib/declarations").VueClass<Lang & Routes>;
export declare class ErrorNotifications extends ErrorNotifications_base {
    updated(): void;
    get flowValidationErrors(): ErrorObject[];
    /**
     * block validation statuses for active flow only
     */
    get blockValidationStatuses(): {
        [key: string]: IValidationStatus;
    };
    hasBlockValidationErrors(uuid: string): boolean;
    hasResourceValidationErrors(uuidOrUuids: string | string[]): boolean;
    isBlockInvalid(block: IBlock): boolean;
    get invalidBlocksInActiveFlow(): IBlock[];
    get numberOfBlocksWithErrors(): number;
    fixFlowError(): Promise<void>;
    fixBlockError(blockId: string, dataPath: string): Promise<void>;
    validationStatuses: {
        [key: string]: IValidationStatus;
    };
    activeFlow?: IFlow;
    resourceUuidsOnActiveFlow: IResource['uuid'][];
}
export default ErrorNotifications;
