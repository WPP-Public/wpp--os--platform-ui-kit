```ts
@Component({
  ...
})
export class BreadcrumbExample {
  public readonly items: BreadcrumbItem[] = [
    {
      label: 'Home',
      path: '/'
    },

    {
      label: 'Alfa',
      path: '/alfa'
    },

    {
      label: 'Bravo (International Radiotelephony Spelling Alphabet)',
      path: '/alfa/bravo'
    },

    {
      label: 'Charlie',
      path: '/alfa/bravo/charlie'
    },

    {
      label: 'Delta (International Radiotelephony Spelling Alphabet)',
      path: '/alfa/bravo/charlie/delta'
    },

    {
      label: 'Echo',
      path: '/alfa/bravo/charlie/delta/echo'
    },

    {
      label: 'Foxtrot',
      path: '/alfa/bravo/charlie/delta/echo/foxtrot'
    }
  ];

  constructor(
    private readonly router: Router
  ) { }

  public handleRouteChange(event: Event): void {
    this.router.navigateByUrl((event as CustomEvent<string>).detail);
  }
}
```

```html
<wpp-breadcrumb [items]="items" middleTruncation (wppChange)="handleRouteChange($event)"></wpp-breadcrumb>
```
