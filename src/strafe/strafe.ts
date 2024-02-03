import { Status } from './status.enum';

export class Strafe {
  id: number = -1;
  name: string = '';
  strafe: number = 0;
  datum: number = Date.now();
  status: string = Status.offen;
  kommentar: string = '';
}
