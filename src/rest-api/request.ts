export class RestApiRequest {
  public request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public async body() {
    try {
      return await this.request.json();
    } catch (error) {
      return {}; // cases when body is null, but still json in content header
    }
  }

  public getPath = () => {
    return (
      '/' +
      this.request.url
        .split('/')
        .slice(3)
        .join('/')
        .split('?')[0]
    );
  };

  public getUrl = () => {
    return this.request.url;
  };

  public getMethod = () => {
    return this.request.method;
  };
}
