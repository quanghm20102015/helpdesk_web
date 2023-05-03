import { environment } from 'src/environments/environment';
export class AppSettings {
  public static HostingAddress = environment.env.HOSTING_API
  public static WebAddress = environment.env.WEB_ADDRESS
}
