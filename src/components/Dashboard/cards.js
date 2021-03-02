import React from 'react'
import { List } from '@material-ui/core/List';

export default function Cards(props) {
    return (
        <div id="root">
  <div class="container pt-5">
    <div class="row align-items-stretch">
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Booked Couriers</h4><span class="hind-font caption-12 c-dashboardInfo__count">{props.mydata.tCount}</span>
        </div>
      </div>
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Pending Couriers</h4><span class="hind-font caption-12 c-dashboardInfo__count">{props.mydata.pCount}</span>
        </div>
      </div>
      <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Delivered Couriers</h4><span class="hind-font caption-12 c-dashboardInfo__count">{props.mydata.dCount}</span>
        </div>
      </div>
      {/* <div class="c-dashboardInfo col-lg-3 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Shipment Requests</h4><span class="hind-font caption-12 c-dashboardInfo__count">1</span>
        </div>
      </div> */}
    </div>
  </div>
</div>
    )
}
