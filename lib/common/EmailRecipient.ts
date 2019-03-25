import { BBUserInfo } from "../api";
import { EmailTarget } from "./EmailTarget";

export default class EmailRecipient {
    private readonly _type: EmailTarget;
    private readonly targets: string[];
    get type(): EmailTarget {
        return this._type;
    }
    public constructor(targetType: EmailTarget, targets?: BBUserInfo[]) {
        if (targetType > 0 && !targets) {
            throw new Error("Email target type " + targetType.toString() + " requires that targets are specified.");
        }
        this._type = targetType;
        this.targets = [];
        if ( targets ) {
            for ( const target of targets ) {
                target.getUserId().then((id) => {
                    this.targets.push(id.toString());
                });
            }
        }
    }
    /**
     * Encodes the target list, if any, as a comma separated and comma terminated list.
     *
     * @throws InvalidOperationError when the target type does not support specifying individual recipients.
     */
    public asTargetList(): string {
        if (this.type === 0) {
            throw new BBError.InvalidOperationError(
                "The target type " + this.type.toString() + " does not support specifying individual targets"
            );
        }
        let list: string = '';
        for ( const target of this.targets ) {
            list += target + ',';
        }
        return list;
    }
    /**
     * Determines the value of the navItem parameter, based on the email target type.
     */
    public getNavItem(): string {
        let postfix: string = '';
        switch (this.type) {
            case EmailTarget.AllUsers:
                postfix = 'all_users';
                break;
            case EmailTarget.AllGroups:
                postfix = 'all_groups';
                break;
            case EmailTarget.AllTeachers:
                postfix = 'all_ta';
                break;
            case EmailTarget.AllStudents:
                postfix = 'all_students';
                break;
            case EmailTarget.AllCourseManagers:
                postfix = 'all_instructors';
                break;
            case EmailTarget.AllObservers:
                postfix = 'all_observers';
                break;
            case EmailTarget.SpecificUsers:
                postfix = 'select_students';
                break;
            case EmailTarget.SpecificGroups:
                postfix = 'select_groups';
                break;
            case EmailTarget.SpecificObservers:
                postfix = 'select_observers';
                break;
        }
        return 'cp_send_email_' + postfix;
    }

    /**
     * Converts this object to a plain JavaScript object to allow passing it through the WindowConnectionManager
     */
    public asPlainObject(): BBBackend.Recipient {
        return {
            navItem: this.getNavItem(),
            targets: this.type === 0 ? '' : this.asTargetList()
        };
    }
}
