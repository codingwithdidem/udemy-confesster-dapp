import {
  CoffeeBought as CoffeeBoughtEvent,
  ConfessionCreated as ConfessionCreatedEvent,
} from "../generated/Confesster/Confesster";
import { Coffee, Confession } from "../generated/schema";

export function handleCoffeeBought(event: CoffeeBoughtEvent): void {
  let coffee = new Coffee(event.params.id.toString());
  coffee.buyer = event.params.buyer;
  coffee.author = event.params.author;
  coffee.message = event.params.message;
  coffee.timestamp = event.block.timestamp;

  coffee.save();
}

export function handleConfessionCreated(event: ConfessionCreatedEvent): void {
  let confession = new Confession(event.params.id.toString());
  confession.hash = event.params.hash;
  confession.message = event.params.message;
  confession.category = event.params.category;
  confession.author = event.params.author;
  confession.timestamp = event.block.timestamp;

  confession.save();
}
