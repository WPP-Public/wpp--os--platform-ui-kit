import { ChangeDetectionStrategy, Component } from '@angular/core'
import { data } from '../../config'

@Component({
  selector: 'app-multiple-tree-with-not-selectable-item-example',
  templateUrl: './tree-multiple-with-not-selectable-item.html',
  styleUrls: ['./tree-multiple-with-not-selectable-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeMultipleWithNotSelectableItem {
  public data: any[] = [
    {
      id: '0',
      title: 'Cars',
      children: [
        {
          id: '0-0',
          title: 'Toyota',
          iconsEnd: [
            {
              name: 'remove',
              icon: 'wpp-icon-info',
            },
            {
              name: 'save',
              icon: 'wpp-icon-cross',
            },
          ],
        },
      ],
    },
    {
      id: '1',
      title: 'Planes',
      isNotSelectable: true,
      children: [
        {
          id: '1-0',
          title: 'B-52',
        },
        {
          id: '1-1',
          title: 'MIG-21',
        },
      ],
    },
  ]

  public treeData = data

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }
}
