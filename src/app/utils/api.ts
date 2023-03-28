export class Fetch {
  // Fetch the content and return the response as a String
  public static async raw_fetch(url: string): Promise<string> {
    return await (await fetch(url)).text();
  }
  // Run an Http request and return the response as a json object
  public static async json_fetch(url: string): Promise<Object> {
    return await (await fetch(url)).json();
  }
}
