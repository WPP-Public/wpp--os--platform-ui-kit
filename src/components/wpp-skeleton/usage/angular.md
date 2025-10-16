```html
<!-- Basic Rectangle Skeleton -->
<wpp-skeleton
  variant="rectangle"
  width="120px"
  height="80px"
></wpp-skeleton>

<!-- Custom Layout: Card Example -->
<div style="width: 260px; padding: 20px;">
  <wpp-skeleton width="60%" height="30px" style="margin-bottom: 16px;"></wpp-skeleton>
  <wpp-skeleton width="90%" height="16px" style="margin-bottom: 8px;"></wpp-skeleton>
  <wpp-skeleton width="80%" height="16px" style="margin-bottom: 24px;"></wpp-skeleton>
  <div style="display: flex; gap: 40px;">
    <wpp-skeleton width="70%" height="8px"></wpp-skeleton>
    <wpp-skeleton width="30%" height="8px"></wpp-skeleton>
  </div>
</div>

<!-- Custom Layout: Table Example -->
<div style="width: 100%;">
  <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;">
    <wpp-skeleton *ngFor="let header of [].constructor(6)" width="100%" height="20px"></wpp-skeleton>
  </div>
  <div *ngFor="let row of [].constructor(5)" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;">
    <wpp-skeleton *ngFor="let col of [].constructor(6)" width="100%" height="16px"></wpp-skeleton>
  </div>
</div>

<!-- Custom Layout: Mixed Layout -->
<div style="display: flex; gap: 24px; align-items: center; padding: 20px;">
  <wpp-skeleton variant="circle" width="50px" height="50px"></wpp-skeleton>
  <div style="flex: 1;">
    <wpp-skeleton width="80%" height="20px" style="margin-bottom: 8px;"></wpp-skeleton>
    <wpp-skeleton width="60%" height="16px"></wpp-skeleton>
  </div>
</div>
```
