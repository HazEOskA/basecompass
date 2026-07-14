const RPC_URL = 'https://mainnet.base.org';
const ERC_8021_SUFFIX = '80218021802180218021802180218021';
const BUILDER_CODE = 'bc_7ys71jwf';
const EXPECTED_DATA_SUFFIX =
  '0x62635f37797337316a77660b00' + ERC_8021_SUFFIX;

export default async function handler(request, response) {
  const hash = String(request.query?.hash || '').toLowerCase();

  if (!/^0x[0-9a-f]{64}$/.test(hash)) {
    return response.status(400).json({
      ok: false,
      error: 'Provide a valid transaction hash in ?hash=0x...',
    });
  }

  try {
    const rpcResponse = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getTransactionByHash',
        params: [hash],
      }),
    });

    if (!rpcResponse.ok) {
      throw new Error(`Base RPC returned HTTP ${rpcResponse.status}`);
    }

    const rpcPayload = await rpcResponse.json();
    const transaction = rpcPayload.result;

    if (!transaction) {
      return response.status(404).json({
        ok: false,
        error: 'Transaction not found by Base RPC.',
      });
    }

    const input = String(transaction.input || '0x').toLowerCase();
    const hasErc8021Suffix = input.endsWith(ERC_8021_SUFFIX);
    const hasExpectedBuilderCode = input.endsWith(
      EXPECTED_DATA_SUFFIX.slice(2).toLowerCase(),
    );

    return response.status(200).json({
      ok: true,
      hash,
      blockNumber: transaction.blockNumber,
      from: transaction.from,
      to: transaction.to,
      value: transaction.value,
      input,
      inputBytes: Math.max(0, (input.length - 2) / 2),
      builderCode: BUILDER_CODE,
      expectedDataSuffix: EXPECTED_DATA_SUFFIX,
      hasErc8021Suffix,
      hasExpectedBuilderCode,
      verdict: hasExpectedBuilderCode
        ? 'ATTRIBUTED'
        : hasErc8021Suffix
          ? 'ERC8021_PRESENT_DIFFERENT_CODE'
          : 'ATTRIBUTION_MISSING',
    });
  } catch (error) {
    return response.status(502).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown RPC error',
    });
  }
}
