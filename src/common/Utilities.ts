import HTTPRequest from "./HTTPRequest";

export default class Utilities {
    /**
     * Get a Blackboard nonce from a course id
     * @param {string} courseId The course id
     * @returns {string} the nonce
     */
    public static getNonceFromCourseId(courseId: string): Promise<string> {
        console.log(courseId)
        return new Promise((resolve, reject) => {
        const noncePath: string = "https://blackboard.nhlstenden.com/webapps/blackboard/execute/modulepage/view?course_id=" + courseId;
        HTTPRequest.getAsync( noncePath ).then( (response) => {
            const parser: DOMParser = new DOMParser();
            const dom: HTMLDocument = parser.parseFromString(response, 'text/html') as HTMLDocument;
            const nonceObject = dom.getElementsByName("blackboard.platform.security.NonceUtil.nonce")[0] as HTMLInputElement;
            resolve(nonceObject.value);
        });
        })
    }

    /**
     * Get a Blackboard nonce from a specified document, located by the formName
     * @param {HTMLDocument} doc The document the nonce is on
     * @param {string} formName The name of the form the nonce is in
     * @returns {string}
     */
    public static getNonceFromForm(doc: HTMLDocument, formName: string): string {
        const form = doc.getElementsByName(formName)[0] as HTMLFormElement;

        return form.elements["blackboard.platform.security.NonceUtil.nonce"].value || "";
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

    /**
     * Helper to determine if the given string is true or false, outside JavaScript's regular way of determining it.
     * In this case, values 'on', 'true' and 'yes' are considered true + an approximation of the atoi() function from C.
     * BlackBoard sometimes returns boolean results as a string holding 'yes' or 'no'.
     *
     *
     * Based on the wfStringToBool function used by MediaWiki:
     * https://phabricator.wikimedia.org/source/mediawiki/browse/master/includes/GlobalFunctions.php
     *
     * @param {string} value
     * @return boolean representation of the string
     */
    public static stringToBoolean(value: string): boolean {
        return value === 'on' || value === 'true' || value === 'yes' || /^\s*[+-]?0*[1-9]/.test(value);
    }
}
