import dgram from 'node:dgram';
import dnsPacket from 'dns-packet';

const server = dgram.createSocket('udp4');

const db = {
  'example.com': {
    type: 'A',
    data: '1.2.3.4',
  },
  'ans.example.com': {
    type: 'CNAME',
    data: 'google.com',
  },
};

// Function to generate a random ID for DNS responses
const generateId = () => Math.floor(Math.random() * 65536);

server.on('message', (msg, rinfo) => {
  try {
    const incomingMsg = dnsPacket.decode(msg);
    const queryName = incomingMsg.questions[0]?.name;
    const ipFromDb = db[queryName];

    if (!ipFromDb) {
      console.log(`No record found for ${queryName}`);
      return;
    }

    const ans = dnsPacket.encode({
      type: 'response',
      id: incomingMsg.id,
      flags: dnsPacket.AUTHORITATIVE_ANSWER,
      question: incomingMsg.questions,
      answers: [{
        type: ipFromDb.type,
        class: 'IN',
        name: queryName,
        data: ipFromDb.data,
      }],
    });

    server.send(ans, rinfo.port, rinfo.address);
  } catch (error) {
    console.error(`Error processing message:\n${error.stack}`);
  }
});

server.bind(3000, () => console.log('My DNS Server is running on port 3000'));

server.on('error', (err) => {
  console.error(`Server error:\n${err.stack}`);
  server.close();
});
