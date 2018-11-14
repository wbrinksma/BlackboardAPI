export default class Utilities {

    /**
     * Get a Blackboard nonce from a specified document, located by the formName
     * @param {HTMLDocument} doc The document the nonce is on
     * @param {string} formName The name of the form the nonce is in
     * @returns {string}
     */
    public static getNonceFromForm(doc: HTMLDocument, formName: string): string {
        const form = doc.getElementsByName(formName)[0] as HTMLFormElement;

        form.getInputs().forEach((input) => {
            if (input.name === "blackboard.platform.security.NonceUtil.nonce") {
                return input.value;
            }
        });

        return "";
    }

    private static readonly SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    private static readonly NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

    /**
     * Escapes all potentially dangerous characters, so that the
     * resulting string can be safely inserted into attribute or
     * element text.
     * @param {string} value The value to escape
     * @returns {string} escaped text
     */
    public static encodeEntities(value: string): string {
        return value.
            replace(/&/g, '&amp;').
            // tslint:disable-next-line:no-shadowed-variable
            replace(Utilities.SURROGATE_PAIR_REGEXP, (value) => {
                const hi = value.charCodeAt(0);
                const low = value.charCodeAt(1);
                return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
            }).
            // tslint:disable-next-line:no-shadowed-variable
            replace(Utilities.NON_ALPHANUMERIC_REGEXP, (value) => {
                return '&#' + value.charCodeAt(0) + ';';
            }).
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
    }
}
