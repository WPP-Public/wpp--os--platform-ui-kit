You could use defaultSelectedIds property to pass an array of default selected ids. In order to make several items opened
by default feel free to add 'open: true' property in the data to the desired item.

> Note: Do not use defaultSelectedIds when you are trying to implement custom selection logic.

> Note: single mode accepts only 1 element in array of defaultSelectedIds.

```html
<div>
  <div>
    <h3 class="text">Single select</h3>
    <wpp-tree [data]="treeData" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
  <div>
    <h3 class="text">Multiple select</h3>
    <wpp-tree [data]="treeData" multiple="true" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
  <div>
    <h3 class="text">Tree with filter</h3>

    <wpp-input type="search" placeholder="Search" (wppChange)="handleSearchChange($event)"></wpp-input>
    <wpp-tree [data]="treeData" [search]="search" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
</div>
```

```ts
@Component({
  selector: 'tree-example-page',
  templateUrl: './tree-2-example.page.html',
  styleUrls: ['./tree-2-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tree2ExamplePage {
  public treeData: TreeType[] = [
    {
      title: 'Cars',
      id: '0',
      children: [
        {
          title: 'Toyota',
          // This particular property makes impossible to select item, but you still can open it or operate with icons
          isNotSelectable: true,
          id: '0-0',
          'data-testid': 'item-toyota',
          iconsEnd: [
            { icon: `wpp-icon-info`, name: 'remove' },
            { icon: 'wpp-icon-cross', name: 'save' },
          ],
          children: [
            {
              title: 'Avalon',
              id: '0-0-0',
              disabled: true,
              'data-testid': 'item-avalon',
            },
            {
              title: 'Prius',
              id: '0-0-1',
              disabled: true,
              'data-testid': 'item-prius',
              iconsEnd: [
                { icon: `wpp-icon-arrow`, name: 'remove' },
                { icon: 'wpp-icon-cross', name: 'save' },
              ],
            },
            {
              title: 'Camry Variants',
              id: '0-0-2',
              'data-testid': 'item-camry',
              iconsEnd: [
                { icon: `wpp-icon-arrow`, name: 'remove' },
                { icon: 'wpp-icon-cross', name: 'save' },
              ],
              children: [
                {
                  title: 'Camry 3.5',
                  id: '0-0-2-1',
                  'data-testid': 'item-camry-3-5',
                },
                {
                  title: 'Camry Hybrid',
                  id: '0-0-2-2',
                  'data-testid': 'item-cambry-hybrid',
                },
              ],
            },
          ],
        },
        {
          title: 'Skoda',
          id: '0-1',
          'data-testid': 'item-skoda',
          children: [
            {
              title: 'Kodiaq',
              id: '0-1-0',
              someProps: true,
              iconEnd: {
                icon: 'wpp-icon-sad',
                name: 'edit',
              },
              'data-testid': 'item-kodiaq',
            },
            {
              title: 'Superb',
              id: '0-1-1',
              'data-testid': 'item-superb',
            },
            {
              title: 'Octavia',
              id: '0-1-2',
              'data-testid': 'item-octavia',
            },
          ],
        },
        {
          title: 'Volkswagen',
          id: '0-2',
          children: [
            {
              title: 'Passat',
              id: '0-2-0',
              'data-testid': 'item-passat',
            },
            {
              title: 'Tiguan',
              id: '0-2-1',
              'data-testid': 'item-tiguan',
            },
            {
              title: 'Touareg',
              id: '0-2-2',
              'data-testid': 'item-touareg',
            },
          ],
        },
      ],
    },
    {
      title: 'Motorcycle',
      id: '1',
      'data-testid': 'item-motorcycle',
    },
    {
      title: 'Planes',
      id: '2',
      'data-testid': 'item-planes',
      children: [
        {
          title: 'B-52',
          id: '2-0',
          'data-testid': 'item-B-52',
        },
        {
          title: 'MIG-21',
          id: '2-1',
          'data-testid': 'item-MIG-21',
        },
      ],
    },
  ]

  public search = ''

  public handleTreeChange(event: any): void {
    this.treeData = event.detail.treeState
  }

  public handleSearchChange(event: any): void {
    this.search = event.detail.value || ''
  }
}
```

```html
<div>
  <div>
    <h3 class="text">Single select with End Content</h3>
    <wpp-tree [data]="treeData" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
  <div>
    <h3 class="text">Multiple select</h3>
    <wpp-tree [data]="treeData" multiple="true" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
  <div>
    <h3 class="text">Tree with filter</h3>
    <wpp-input type="search" placeholder="Search" (wppChange)="handleSearchChange($event)"></wpp-input>
    <wpp-tree [data]="treeData" [search]="search" (wppChange)="handleTreeChange($event)"></wpp-tree>
  </div>
</div>
```

```ts
@Component({
  selector: 'tree-example-page',
  templateUrl: './tree-example.page.html',
  styleUrls: ['./tree-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeExamplePage {
  public treeData: TreeType[] = [
    {
      title: 'Task 1',
      id: '1',
      'data-testid': 'task-1',
      endContent: {
        contentType: 'text',
        props: { text: 'Due in 3 days' },
      },
      children: [
        {
          title: 'Subtask 1.1',
          id: '1-1',
          'data-testid': 'task-1-1',
          endContent: {
            contentType: 'tag',
            props: {
              label: 'In Progress',
              variant: 'warning',
              icon: 'wpp-icon-info',
            },
          },
        },
      ],
    },
    {
      title: 'Task 2',
      id: '2',
      'data-testid': 'task-2',
      endContent: {
        contentType: 'avatar',
        props: {
          src: 'https://example.com/avatar1.jpg',
          name: 'John Doe',
          size: 'sm',
        },
      },
      children: [
        {
          title: 'Subtask 2.1',
          id: '2-1',
          'data-testid': 'task-2-1',
          endContent: {
            contentType: 'avatarGroup',
            props: {
              avatars: [
                { src: 'https://example.com/avatar2.jpg', name: 'Jane' },
                { src: 'https://example.com/avatar3.jpg', name: 'Tom' },
              ],
            },
          },
        },
      ],
    },
  ]

  public search = ''

  public handleTreeChange(event: any): void {
    this.treeData = event.detail.treeState
  }

  public handleSearchChange(event: any): void {
    this.search = event.detail.value || ''
  }
}
```
