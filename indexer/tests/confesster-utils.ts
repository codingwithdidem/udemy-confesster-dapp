import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  CoffeeBought,
  ConfessionCreated
} from "../generated/Confesster/Confesster"

export function createCoffeeBoughtEvent(
  id: BigInt,
  buyer: Address,
  author: Address,
  message: string,
  timestamp: BigInt
): CoffeeBought {
  let coffeeBoughtEvent = changetype<CoffeeBought>(newMockEvent())

  coffeeBoughtEvent.parameters = new Array()

  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  coffeeBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return coffeeBoughtEvent
}

export function createConfessionCreatedEvent(
  id: BigInt,
  hash: string,
  message: string,
  category: string,
  author: Address,
  timestamp: BigInt
): ConfessionCreated {
  let confessionCreatedEvent = changetype<ConfessionCreated>(newMockEvent())

  confessionCreatedEvent.parameters = new Array()

  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )
  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  confessionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return confessionCreatedEvent
}
