class cardHeader {
  private title: string;
  private imageSource: string;
  private returnPrevious: string | ((e) => void);
  private closePage: (e) => void;

  constructor(title: string = "", imageSource: string = "", returnPrevious: string | ((e) => void) = null, closePage: (e) => void = null) {
    this.setTitle(title);
    this.setImageSource(imageSource);
    this.setReturnPrevious(returnPrevious);
    this.setClosePage(closePage);
  }

  getTitle(): string { return this.title; }
  setTitle(title: string) { this.title = title; }
  getImageSource(): string { return this.imageSource; }
  setImageSource(imageSource: string) { this.imageSource = imageSource; }
  getReturnPrevious(): string | ((e) => void) { return this.returnPrevious; }
  setReturnPrevious(returnPrevious: string | ((e) => void)) { this.returnPrevious = returnPrevious; }
  getClosePage(): (e) => void { return this.closePage; }
  setClosePage(closePage: (e) => void) { this.closePage = closePage; }
}

export default cardHeader;
