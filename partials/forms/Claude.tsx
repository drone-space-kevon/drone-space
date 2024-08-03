"use client";

import React, { useContext, useEffect, useState } from "react";

import { ActionIcon, Box, Button, Center, Grid, GridCol, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { IconCheck, IconSend, IconX } from "@tabler/icons-react";

import text from "@/handlers/validators/form/special/text";
import hasLength from "@/handlers/validators/form/generic/length";
import email from "@/handlers/validators/form/special/email";
import phone from "@/handlers/validators/form/special/phone";
import capitalize from "@/handlers/parsers/string/capitalize";

import request from "@/hooks/request";

import contact from "@/data/contact";

import classes from "./Claude.module.scss";

import { ClaudeContext, typeClaudeTurn } from "@/contexts/Claude";
import { getHotkeyHandler } from "@mantine/hooks";

interface typePrompt {
	content: string;
}

export default function Claude() {
	const claude = useContext(ClaudeContext);

	if (!claude) {
		throw new Error("Outside Claude Context");
	}

	const { submitted, setSubmitted, generating, setGenerating, conversation, setConversation, clearConversation } =
		claude;

	const form = useForm({
		initialValues: { content: "" },
		validate: { content: value => value.trim().length < 1 },
	});

	const parse = (rawData: typePrompt) => {
		return rawData.content.trim();
	};

	const handleSubmit = async (formValues: typePrompt) => {
		if (form.isValid()) {
			try {
				setConversation([...conversation, { role: "user", content: parse(formValues) }]);

				setSubmitted(true);
				setGenerating(true);

				console.log(conversation);

				const res = await request.post(process.env.NEXT_PUBLIC_API_URL + "/api/claude", {
					method: "POST",
					body: JSON.stringify({
						model: process.env.NEXT_PUBLIC_CLAUDE_MODEL,
						max_tokens: 96, // 1024
						messages: [...conversation, { role: "user", content: parse(formValues) }],
					}),
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				});

				if (!res) {
					notifications.show({
						id: "form-contact-failed-no-response",
						icon: <IconX size={16} stroke={1.5} />,
						title: "Server Unavailable",
						message: `There was no response from the server.`,
						variant: "failed",
					});

					// remove last user input
					conversation.pop();
				} else {
					conversation.push(
						{ role: "user", content: parse(formValues) },
						{ role: "assistant", content: `ai response: ${parse(formValues)}` }
					);

					console.log(conversation);

					res.content && conversation.push({ role: "assistant", content: res.content });
				}
			} catch (error) {
				notifications.show({
					id: "form-contact-failed",
					icon: <IconX size={16} stroke={1.5} />,
					title: "Submisstion Failed",
					message: (error as Error).message,
					variant: "failed",
				});

				// remove last user input
				conversation.pop();
			} finally {
				form.reset();
				setSubmitted(false);
				setGenerating(false);
			}
		}
	};

	// useEffect(()=>{
	// 	form.reset();
	// },[])

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Group wrap="nowrap" gap={"xs"} align="end" className={classes.group}>
				<Textarea
					required
					placeholder={`Ask Claude about ${contact.name.company}`}
					autosize
					minRows={1}
					maxRows={5}
					{...form.getInputProps("content")}
					onKeyDown={getHotkeyHandler([["mod+Enter", form.onSubmit(values => handleSubmit(values))]])}
					classNames={{ input: classes.input }}
					w={"100%"}
					disabled={submitted || generating}
				/>

				<Stack align="end" justify="end">
					<ActionIcon w={32} h={32} variant="light" type="submit" loading={submitted || generating}>
						<IconSend size={24} stroke={2} />
					</ActionIcon>
				</Stack>
			</Group>
		</Box>
	);
}
