import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getDeliveryDate(deliveryOptionId) {
    const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
    const today = dayjs();

    // Skip weekends
    let deliveryDate = today;
    let deliveryDays = 0;
    while (deliveryDays < deliveryOption.deliveryDays) {
      deliveryDate = deliveryDate.add(1, 'days');
      const weekDay = deliveryDate.format('dddd');
      if (weekDay !== 'Saturday' && weekDay !== 'Sunday') {
        deliveryDays++;
      }
    }

    return deliveryDate.format('dddd, MMMM D');
  }