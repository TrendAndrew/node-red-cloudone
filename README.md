# TrendMicro Cloud One Node-RED Client Nodes

# TrendMicro Cloud One Workload Security Node-RED Client Nodes
[![Latest NPM Version](https://img.shields.io/npm/v/@trendmicro-cloudone/node-red-core.svg)](https://www.npmjs.com/package/@trendmicro-cloudone/node-red-core)
[![License](https://img.shields.io/github/license/TrendAndrew/node-red-workloadsecurity.svg)](https://github.com/TrendAndrew/node-red-core/blob/main/LICENSE)
[![Donate](https://img.shields.io/badge/donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JUYN6NBFELTC2&source=url)

Node Red Nodes Implementing the Trend Micro CloudOne Integrations APIs: https://cloudone.trendmicro.com/docs/integrations/api-reference/tag/Integrations

# Overview

Trend Micro CloudOne Core Module

Provides service configuration node and "Integrations" api functionality nodes.

# Documentation

For each "service" you create a single configuration node that provides the reusable connection for all your API calls to Cloud One.

![Configuration Node](https://github.com/TrendAndrew/node-red-core/raw/main/images/confignode.png "Configuration Node")

This module also includes a couple of nodes for "Integrations" api calls, but for each specific CloudOne capability, you also install the appropriate nodes:

|-|-|
| Cloud One Service | Nodes supporting that Service |
|-|-|
| Conformity | [@trendmicro-cloudone/node-red-conformity](https://www.npmjs.com/package/@trendmicro-cloudone/node-red-conformity) |
|-|-|
| Workload Security | [@trendmicro-cloudone/node-red-workloadsecurity](https://www.npmjs.com/package/@trendmicro-cloudone/node-red-workloadsecurity) |
|-|-|
| Container Security | (Coming Soon) |
|-|-|

## Flow examples

To GET all computers, use the "List Computers" node.

The nodes take input msgs to trigger the api calls, the msg.payload can typically have arguments to override the node settings, for instance you can pass in API arguments such as query strings, account ids, etc.

![List Computers Flow Example](https://github.com/TrendAndrew/node-red-cloudone/raw/main/images/example-listcomputers.png "List Computers Flow Example")

The node will provide status on the call and on the response content summary (in this example, how many computers were found).

The outgoing response msg includes the api output as the msg.payload.

## A few notes about working behind a corporate proxy

I realise the majority of enterprise installations will be working behind a proxy.

The service node provides a proxy functionality (still in beta).

![Proxy Settings](https://github.com/TrendAndrew/node-red-core/raw/main/images/proxysettings.png "Proxy Settings")

Try the built-in proxy capability first for the main service config node, but it may requires a few extra steps for installation of node-red, node-red plugins and connection. But this these nodes have been installed successfully in quite a few large organisations with strict security with no issues. Just take some time to work out the extra steps required as a vanilla node-red installation may not readily support deployment within your environment without a little extra work.

Bear in mind also, if you are prototyping this for an organisation on a workstation or VM, you might need a few exceptions or to run with something like fiddler. This is a well known possible requirement for utilising node-red behind a proxy and is by virtue of how proxies work. The solutions are available and you just need to choose the combination appropriate for your environment.

Once you are installing into production, the process should become easier as proxy rules can be attached to appropriate server classes/groupings to allow unauthenticated proxy traffic or proxy bypass to required endpoints as you see fit in your organisation. 

# Bugs and Feedback

For bugs, questions and discussions please log/discuss here 
[GitHub Issues](https://github.com/TrendAndrew/node-red-core/issues).

# Donations [![Donate](https://img.shields.io/badge/donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JUYN6NBFELTC2&source=url)

If you would like to donate some money to support ongoing development or as a simple thank you for me sharing this project for others to use, please feel free to send money via
[PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JUYN6NBFELTC2&source=url).

# LICENSE

Copyright (c) 2018 Andrew Longhorn <Andrew_Longhorn@TrendMicro.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
