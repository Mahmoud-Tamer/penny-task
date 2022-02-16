import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loader = false;
  public set loading(v: boolean) { this.loader = v; }
  public get loading(): boolean { return this.loader; }
}
