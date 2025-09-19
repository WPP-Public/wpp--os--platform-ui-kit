You could use defaultSelectedIds property to pass an array of default selected ids. In order to make several items opened
by default feel free to add 'open: true' property in the data to the desired item.

> Note: Do not use defaultSelectedIds when you are trying to implement custom selection logic.

> Note: single mode accepts only 1 element in array of defaultSelectedIds.

```html
<div>
  <div>
    <h3 class='text'>Single select</h3>
    <wpp-tree [data]='treeData' (wppChange)='handleTreeChange($event)'></wpp-tree>
  </div>
  <div>
    <h3 class='text'>Multiple select</h3>
    <wpp-tree [data]='treeData' multiple="true" (wppChange)='handleTreeChange($event)'></wpp-tree>
  </div>
  <div>
    <h3 class='text'>Tree with filter</h3>

    <wpp-input type="search" placeholder="Search" (wppChange)='handleSearchChange($event)'></wpp-input>
    <wpp-tree [data]='treeData' [search]='search' (wppChange)='handleTreeChange($event)'></wpp-tree>
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
          id: '1',
          iconsEnd: [
            { icon: `wpp-icon-arrow`, name: 'remove' },
            { icon: 'wpp-icon-cross', name: 'save' },
          ],
          children: [
            {
              title: 'Avalon',
              id: '1-1',
              disabled: true,
            },
            {
              title: 'Prius',
              id: '1-2',
              disabled: true,
              iconsEnd: [
                { icon: `wpp-icon-arrow`, name: 'remove' },
                { icon: 'wpp-icon-cross', name: 'save' },
              ],
            },
            {
              title: 'Camry Variants',
              id: '1-3',
              iconsEnd: [
                { icon: `wpp-icon-arrow`, name: 'remove' },
                { icon: 'wpp-icon-cross', name: 'save' },
              ],
              children: [
                {
                  title: 'Camry 3.5',
                  id: '1-3-1',
                },
                {
                  title: 'Camry Hybrid',
                  id: '1-3-2',
                },
              ],
            },
          ],
        },
        {
          title: 'Skoda',
          id: '2',
          children: [
            {
              title: 'Kodiaq',
              id: '2-1',
              iconEnd: {
                icon: 'wpp-icon-sad',
                name: 'edit',
              },
            },
            {
              title: 'Superb',
              id: '2-2',
            },
            {
              title: 'Octavia',
              id: '2-3',
            },
          ],
        },
        {
          title: 'Volkswagen',
          id: '3',
          children: [
            {
              title: 'Passat',
              id: '3-1',
            },
            {
              title: 'Tiguan',
              id: '3-2',
            },
            {
              title: 'Touareg',
              id: '3-3',
            },
          ],
        },
      ],
    },
    {
      title: 'Motocicle',
      id: '4',
    },
    {
      title: 'Planes',
      id: '5',
      children: [
        {
          title: 'B-52',
          id: '5-1',
        },
        {
          title: 'MIG-21',
          id: '5-2',
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
    <h3 class='text'>Single select with End Content</h3>
    <wpp-tree [data]='treeData' (wppChange)='handleTreeChange($event)'></wpp-tree>
  </div>
  <div>
    <h3 class='text'>Multiple select</h3>
    <wpp-tree [data]='treeData' multiple="true" (wppChange)='handleTreeChange($event)'></wpp-tree>
  </div>
  <div>
    <h3 class='text'>Tree with filter</h3>
    <wpp-input type="search" placeholder="Search" (wppChange)='handleSearchChange($event)'></wpp-input>
    <wpp-tree [data]='treeData' [search]='search' (wppChange)='handleTreeChange($event)'></wpp-tree>
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
      id: '0',
      endContent: {
        contentType: 'text',
        props: { text: 'Due in 3 days' }
      },
      children: [
        {
          title: 'Subtask 1.1',
          id: '0-1',
          endContent: {
            contentType: 'tag',
            props: {
              label: 'In Progress',
              variant: 'warning',
              icon: 'wpp-icon-info'
            }
          },
        }
      ]
    },
    {
      title: 'Task 2',
      id: '1',
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
          id: '1-1',
          endContent: {
            contentType: 'avatarGroup',
            props: {
              avatars: [
                { src: 'https://example.com/avatar2.jpg', name: 'Jane' },
                { src: 'https://example.com/avatar3.jpg', name: 'Tom' },
              ]
            }
          }
        }
      ]
    }
  ];

  public search = '';

  public handleTreeChange(event: any): void {
    this.treeData = event.detail.treeState;
  }

  public handleSearchChange(event: any): void {
    this.search = event.detail.value || '';
  }
}
```
