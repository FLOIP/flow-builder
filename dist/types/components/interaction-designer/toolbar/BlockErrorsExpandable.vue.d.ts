import { IValidationStatus } from '../../../store/validation';
import Lang from '../../../lib/filters/lang';
import { ErrorObject } from 'ajv';
import { IBlock, IFlow, IResource } from '@floip/flow-runner';
declare const BlockErrorsExpandable_base: import("vue-class-component/lib/declarations").VueClass<Lang>;
export declare class BlockErrorsExpandable extends BlockErrorsExpandable_base {
    readonly block: IBlock;
    isExpanded: boolean;
    get errorsToShow(): ErrorObject[];
    /**
     * get allErrors to consider errors from:
     * - block validation
     * - resource validation
     */
    get allErrors(): ErrorObject[];
    get isListLong(): boolean;
    get blockLabel(): string;
    get currentBlockResourceUuids(): IResource['uuid'][];
    get resourceValidationStatusesForCurrentBlock(): ErrorObject[];
    get backendResourceValidationStatusesForCurrentBlock(): ErrorObject[];
    get backendBlockValidationStatusesForCurrentBlock(): ErrorObject[];
    get blockValidationStatusesForCurrentBlock(): ErrorObject[];
    getAjvErrorsFor(type: 'block' | 'resource' | 'backend/block' | 'backend/resource', uuid: string): ErrorObject[];
    toggleList(): void;
    validationStatuses: {
        [key: string]: IValidationStatus;
    };
    activeFlow?: IFlow;
}
export default BlockErrorsExpandable;
