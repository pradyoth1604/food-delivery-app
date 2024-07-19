<div *ngIf="orders.length > 0" class="order-history-container">
  <h2>Order History</h2>
  <table class="table table-responsive">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total Cost</th>
        <th>Address</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let order of orders">
        <td>{{ order.id }}</td>
        <td>{{ order.date | date: 'short' }}</td>
        <td class="status {{ order.status.toLowerCase() }}">{{ order.status }}</td>
        <td>{{ order.totalCost | currency }}</td>
        <td>{{ order.address }}</td>
        <td>
          <table class="nested-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of order.items">
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div *ngIf="orders.length === 0" class="empty-orders">
  <h2>No orders found</h2>
</div>


.order-history-container {
  padding: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
}

.status {
  text-transform: capitalize;
}

.status.delivered {
  color: green;
}

.status.pending {
  color: orange;
}

.status.cancelled {
  color: red;
}

.nested-table {
  width: 100%;
  border-collapse: collapse;
}

.nested-table th, .nested-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.nested-table th {
  background-color: #e9e9e9;
}

.empty-orders {
  text-align: center;
  padding: 20px;
}

.empty-orders h2 {
  color: #999;
}
