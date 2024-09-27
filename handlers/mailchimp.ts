const addSubscriber = async (email: string) => {
	const response = await fetch(
		`https://${process.env.NEXT_PUBLIC_SERVERNAME_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.NEXT_MAILCHIMP_AUDIENCE_ID_DST}/members`,

		{
			body: JSON.stringify({ email_address: email, status: "subscribed" }),
			headers: {
				Authorization: `apikey ${process.env.NEXT_MAILCHIMP_KEY_GENERAL}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		}
	);

	const res = await response.json();

	return res;
};

export default addSubscriber;
