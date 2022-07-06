interface SceneProps {
  width: number,
  height: number
}

export class Scene {
  private props: SceneProps;
  private instance: Scene | null;
  constructor(props: SceneProps) {
    if (this.instance) {
      return this.instance;
    }
    this.props = props;
    this.instance = this;
  }
  getSize() {
    const { width, height } = this.props;
    return { width, height };
  }
}