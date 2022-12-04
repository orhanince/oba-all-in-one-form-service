/*
 * How to use!
 *
 * const producer = kafka.producer()
 * const consumer = kafka.consumer({ groupId: 'test-group' })
 *
 * const run = async () => {
 *   // Producing
 *   await producer.connect()
 *   await producer.send({
 *     topic: 'test-topic',
 *     messages: [
 *       { value: 'Hello KafkaJS user!' },
 *     ],
 *   })
 *
 *   // Consuming
 *   await consumer.connect()
 *   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
 *
 *   await consumer.run({
 *     eachMessage: async ({ topic, partition, message }) => {
 *       console.log({
 *         partition,
 *         offset: message.offset,
 *         value: message.value.toString(),
 *       })
 *     },
 *   });
 * };
 *
 */

const { Kafka } = require('kafkajs');

module.exports = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS.split(','),
});
