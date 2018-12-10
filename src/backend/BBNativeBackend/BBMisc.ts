import {BBBackend} from "../../@types/BBBackend";
import Misc from '../../common/BBAbstractBackend/misc';

export default class BBMisc extends Misc {
  public getBlackboardDomain(): string {
      throw new Error("Method not implemented.");
  }
}
