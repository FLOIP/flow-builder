import { Vue } from 'vue-property-decorator';
export declare class TextEditor extends Vue {
    readonly label: string | number;
    readonly labelClass: string;
    readonly placeholder: string;
    readonly value?: string;
    readonly validState?: boolean;
    readonly rows: number;
    get isInvalid(): boolean;
}
export default TextEditor;
