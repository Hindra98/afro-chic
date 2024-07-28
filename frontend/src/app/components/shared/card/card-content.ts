class content {
  private content: JSX.Element | React.ReactNode | string | null;

  constructor(content: JSX.Element | React.ReactNode | string) {
    this.setContent(content);
  }

  getContent(): JSX.Element | React.ReactNode | string { return this.content; }
  setContent(content: JSX.Element | React.ReactNode | string) { this.content = content; }
}

export default content;
