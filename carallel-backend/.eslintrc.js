module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/camelcase": ["error", {"allow": ["login_id", "client_code", "transmission_datetime", "api_key",
      "request_id", "response_status", "verification_type", "share_code", "scanned_ont", "gpon_port", "ont_sn", "idProofPhoto_back",
      "addressProofPhoto_back", "plan_name", "base_price", "installation_fee", "security_deposit", "zone_name", "jaze_key", "jaze_token",
      "address_line1", "address_line2", "address_city", "address_pin", "address_state", "id_proof", "id_pin", "view_less", 
      "reminder_enable", "sms_notify", "email_notify", "expire_by", "callback_url", "callback_method", "pan_number", "channel_code",
      "channel_version", "operation_mode", "run_mode", "actor_type", "user_handle_type", "user_handle_value", "function_code",
      "function_sub_code", "pan_details", "first_name", "last_name"]}],
  },
};
