import type { HttpClient } from '../client/HttpClient';
import type {
  Order,
  OrderReply,
  OrderEntryRequest,
  OrderModifyRequest,
} from '../types/api';

/**
 * Orders resource for order operations
 */
export class OrdersResource {
  constructor(private http: HttpClient) {}

  /**
   * Get all orders for account(s)
   * GET /accounts/{accid}/orders
   *
   * @param accountIds - Single account ID or array of account IDs
   * @param options - Optional parameters
   * @param options.deleted - Include deleted orders from today
   * @returns Array of orders
   */
  async list(
    accountIds: number | number[],
    options?: {
      deleted?: boolean;
    }
  ): Promise<Order[]> {
    const ids = Array.isArray(accountIds)
      ? accountIds.join(',')
      : String(accountIds);

    const params: Record<string, boolean | undefined> = {};

    if (options?.deleted !== undefined) {
      params.deleted = options.deleted;
    }

    return this.http.get<Order[]>(`/accounts/${ids}/orders`, { params });
  }

  /**
   * Create a new order
   * POST /accounts/{accid}/orders
   *
   * @param accountId - Account identifier
   * @param order - Order parameters
   * @returns Order reply with order ID and status
   */
  async create(
    accountId: number,
    order: OrderEntryRequest
  ): Promise<OrderReply> {
    // Convert to FormData-like object for the API
    const formData: Record<string, string | number> = {
      market_id: order.market_id,
      side: order.side,
      volume: order.volume,
    };

    if (order.identifier !== undefined) {
      formData.identifier = order.identifier;
    }

    if (order.price !== undefined) {
      formData.price = order.price;
    }

    if (order.currency !== undefined) {
      formData.currency = order.currency;
    }

    if (order.order_type !== undefined) {
      formData.order_type = order.order_type;
    }

    if (order.valid_until !== undefined) {
      formData.valid_until = order.valid_until;
    }

    if (order.open_volume !== undefined) {
      formData.open_volume = order.open_volume;
    }

    if (order.activation_condition !== undefined) {
      formData.activation_condition = order.activation_condition;
    }

    if (order.trigger_value !== undefined) {
      formData.trigger_value = order.trigger_value;
    }

    if (order.trigger_condition !== undefined) {
      formData.trigger_condition = order.trigger_condition;
    }

    if (order.target_value !== undefined) {
      formData.target_value = order.target_value;
    }

    if (order.reference !== undefined) {
      formData.reference = order.reference;
    }

    return this.http.post<OrderReply>(
      `/accounts/${accountId}/orders`,
      formData
    );
  }

  /**
   * Modify an existing order
   * PUT /accounts/{accid}/orders/{order_id}
   *
   * @param accountId - Account identifier
   * @param orderId - Order identifier
   * @param modifications - Order modifications
   * @returns Order reply with updated status
   */
  async modify(
    accountId: number,
    orderId: number,
    modifications: OrderModifyRequest
  ): Promise<OrderReply> {
    const formData: Record<string, string | number> = {};

    if (modifications.price !== undefined) {
      formData.price = modifications.price;
    }

    if (modifications.volume !== undefined) {
      formData.volume = modifications.volume;
    }

    if (modifications.open_volume !== undefined) {
      formData.open_volume = modifications.open_volume;
    }

    if (modifications.currency !== undefined) {
      formData.currency = modifications.currency;
    }

    return this.http.put<OrderReply>(
      `/accounts/${accountId}/orders/${orderId}`,
      formData
    );
  }

  /**
   * Delete/cancel an order
   * DELETE /accounts/{accid}/orders/{order_id}
   *
   * @param accountId - Account identifier
   * @param orderId - Order identifier
   * @returns Order reply with deletion status
   */
  async delete(accountId: number, orderId: number): Promise<OrderReply> {
    return this.http.delete<OrderReply>(
      `/accounts/${accountId}/orders/${orderId}`
    );
  }

  /**
   * Activate an inactive order
   * PUT /accounts/{accid}/orders/{order_id}/activate
   *
   * @param accountId - Account identifier
   * @param orderIds - Single order ID or array of order IDs
   * @returns Array of order replies
   */
  async activate(
    accountId: number,
    orderIds: number | number[]
  ): Promise<OrderReply[]> {
    const ids = Array.isArray(orderIds) ? orderIds.join(',') : String(orderIds);

    return this.http.put<OrderReply[]>(
      `/accounts/${accountId}/orders/${ids}/activate`
    );
  }
}
