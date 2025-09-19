```ts
export class VerticalStepper {
  public LAST_PAGE = 7
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 5

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  handleNextStep = () => {
    if (this.currentStep === this.LAST_PAGE) return
    if (this.currentStep === this.REQUIRED_STEP && !this.isChecked) {
      this.isError = true

      return
    }

    this.currentStep += 1
  }

  handlePreviousStep = () => {
    if (this.currentStep < 0) return
    const previousStep = this.getPreviousStep(this.currentStep)

    this.currentStep -= 1
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.index

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner page-${this.currentStep}`
}
```

```html
<div class="main">
  <div class="wrapper">
    <div class="stepper">
      <wpp-stepper [activeStep]="currentStep" (wppChange)="handleChange($event)">
        <wpp-step>
          <p slot="label" class="text">Step 1</p>
          <span slot="description">
            First step (this text gets truncated if it's too long and a tooltip is displayed)
          </span>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 2</p>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 3</p>
          <span slot="description">With substeps</span>
          <wpp-step substep optional>
            <p class="subtext">Sub step 3.1</p>
          </wpp-step>
          <wpp-step substep [error]="isError" icon-description="Error message">
            <p class="subtext" slot="label">Sub step 3.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 4</p>
          <span slot="description">Last Step</span>
        </wpp-step>
      </wpp-stepper>
    </div>
    <div class="pages">
      <div [class]="getPageClassName()">
        <div class="page" data-testid="first-page">
          <h3>Page 1</h3>
          <wpp-radio
            class="margin"
            [labelConfig]="getLabelConfig('Option 1')"
            required
            data-testid="stepper-radio-button"
          ></wpp-radio>
        </div>
        <div class="page">
          <h3>Page 2</h3>
        </div>
        <div class="page">
          <h3>Page 3</h3>
        </div>
        <div class="page">
          <h3>Sub page 3.1</h3>
        </div>
        <div class="page">
          <h3>Sub page 3.2</h3>
          <wpp-checkbox class="margin" required (wppChange)="handleCheckbox($event)"></wpp-checkbox>
        </div>
        <div class="page" data-testid="fourth-page">
          <h3>Page 4</h3>
        </div>
        <div class="page">
          <h3>FINAL</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="buttons">
    <wpp-button (click)="handlePreviousStep()" data-testid="previous-button">Previous Step</wpp-button>
    <wpp-button (click)="handleNextStep()" class="button" data-testid="next-button"> Next Step</wpp-button>
  </div>
</div>
```

```scss
$pageHeight: 70vh;

.main {
  padding: 20px;
}

.text {
  margin: 0;
}

.subtext {
  margin: 0;
  font-weight: 400;
}

.stepper {
  width: 200px;
  text-align: center;
}

.pages {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $pageHeight;
  background-color: var(--wpp-grey-color-100);
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}

.margin {
  margin-left: 20px;
}

.wrapper {
  display: flex;
}

.buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 16px;
}

.button {
  margin-left: 8px;
}

.inner {
  transition: 0.6s ease-in-out;
}

.page-1 {
  transform: translateY(0);
}

.page-2 {
  transform: translateY(-670px);
}

.page-3 {
  transform: translateY(-1320px);
}

.page-4 {
  transform: translateY(-1990px);
}

.page-5 {
  transform: translateY(-2620px);
}

.page-6 {
  transform: translateY(-3230px);
}

.page-7 {
  transform: translateY(-3900px);
}
```

```ts
export class VerticalDecimalStepper {
  public LAST_PAGE = 5
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 3.2

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  public stepsMap: { [key: number]: { next?: number; prev?: number } } = {
    1: { next: 2.1 },
    2: { next: 2.2, prev: 1 },
    2.1: { next: 2.2, prev: 1 },
    2.2: { next: 3.1, prev: 2.1 },
    3: { next: 3.2, prev: 2.2 },
    3.1: { next: 3.2, prev: 2.2 },
    3.2: { next: 3.3, prev: 3.1 },
    3.3: { next: 4, prev: 3.2 },
    4: { next: 5, prev: 3.3 },
    5: { prev: 4 },
  }

  handleNextStep = () => {
    if (this.currentStep >= this.LAST_PAGE) return
    if (this.currentStep === this.REQUIRED_STEP && !this.isChecked) {
      this.isError = true
      return
    }

    const nextStep = this.stepsMap[this.currentStep]?.next ?? this.currentStep
    this.currentStep = nextStep
  }

  handlePreviousStep = () => {
    if (this.currentStep <= this.FIRST_PAGE) return

    const previousStep = this.stepsMap[this.currentStep]?.prev ?? this.currentStep
    this.currentStep = previousStep
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.step

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner decimal-page-${this.currentStep.toString().replace('.', '_')}`
}
```

```html
<div class="main">
  <div class="wrapper">
    <div class="stepper">
      <wpp-stepper [activeStep]="currentStep" (wppChange)="handleChange($event)">
        <wpp-step>
          <p slot="label" class="text">Step 1</p>
          <span slot="description">
            First step (this text gets truncated if it's too long and a tooltip is displayed)
          </span>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 2</p>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 2.1</p>
          </wpp-step>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 2.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 3</p>
          <span slot="description">With substeps</span>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 3.1</p>
          </wpp-step>
          <wpp-step substep [error]="isError" icon-description="Error message">
            <p class="subtext" slot="label">Sub-step 3.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 4</p>
          <span slot="description">Last Step</span>
        </wpp-step>
      </wpp-stepper>
    </div>
    <div class="pages">
      <div [class]="getPageClassName()">
        <div class="page" data-testid="first-page">
          <h3>Page 1</h3>
          <wpp-radio
            class="margin"
            [labelConfig]="getLabelConfig('Option 1')"
            required
            data-testid="stepper-radio-button"
          ></wpp-radio>
        </div>
        <div class="page">
          <h3>Page 2</h3>
        </div>
        <div class="page">
          <h3>Sub-page 2.1</h3>
        </div>
        <div class="page">
          <h3>Sub-page 2.2</h3>
        </div>
        <div class="page">
          <h3>Sub-page 3.1</h3>
        </div>
        <div class="page">
          <h3>Sub-page 3.2</h3>
          <wpp-checkbox class="margin" required (wppChange)="handleCheckbox($event)"></wpp-checkbox>
        </div>
        <div class="page">
          <h3>Page 4</h3>
        </div>
        <div class="page">
          <h3>FINAL</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="buttons">
    <wpp-button (click)="handlePreviousStep()" data-testid="previous-button">Previous Step</wpp-button>
    <wpp-button (click)="handleNextStep()" class="button" data-testid="next-button">Next Step</wpp-button>
  </div>
</div>
```

```scss
$pageHeight: 70vh;

.main {
  padding: 20px;
}

.text {
  margin: 0;
}

.subtext {
  margin: 0;
  font-weight: 400;
}

.stepper {
  width: 200px;
  text-align: center;
}

.pages {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $pageHeight;
  background-color: var(--wpp-grey-color-100);
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}

.margin {
  margin-left: 20px;
}

.wrapper {
  display: flex;
}

.buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 16px;
}

.button {
  margin-left: 8px;
}

.inner {
  transition: 0.6s ease-in-out;
}

.decimal-page-1 {
  transform: translateY(0);
}

.decimal-page-2 {
  transform: translateY(-670px);
}

.decimal-page-2_1 {
  transform: translateY(-1320px);
}

.decimal-page-2_2 {
  transform: translateY(-1990px);
}

.decimal-page-3 {
  transform: translateY(-2620px);
}

.decimal-page-3_1 {
  transform: translateY(-3230px);
}

.decimal-page-3_2 {
  transform: translateY(-3900px);
}

.decimal-page-4 {
  transform: translateY(-4570px);
}

.decimal-page-5 {
  transform: translateY(-5230px);
}
```
