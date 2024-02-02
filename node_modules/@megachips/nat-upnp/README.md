# NAT UPnP

Port mapping via UPnP APIs

## Installation

```bash
npm i @runonflux/nat-upnp
```

## Usage

```javascript
// using ES modules
import { Client } from "@runonflux/nat-upnp";
const client = new Client();

// using node require
const natUpnp = require("@runonflux/nat-upnp");
const client = new natUpnp.Client();

client
  .createMapping({
    public: 12345,
    private: 54321,
    ttl: 10,
  })
  .then(() => {
    // Will be called once finished
  })
  .catch(() => {
    // Will be called on error
  });

async () => {
  await client.removeMapping({
    public: 12345,
  });
};

client.getMappings();

client.getMappings({
  local: true,
  description: "both of these fields are optional",
});

client.getPublicIp();
```

### License

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2012.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
