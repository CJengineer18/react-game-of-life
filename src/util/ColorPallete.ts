export default class ColorPallete {
    private palleteName: string;
    private cssClassName: string;

    constructor(palleteName: string, cssClassName: string) {
        this.palleteName = palleteName;
        this.cssClassName = cssClassName;
    }

    getPalleteName() {
        return this.palleteName;
    }

    getCssClassName() {
        return this.cssClassName;
    }
}
