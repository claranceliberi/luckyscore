for (let i = 0; i < 1000; i++) {
  (async () => {
    const rawResponse = await fetch(
      "https://api.karisimbi.events/api/nominee/vote",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: `{"awardId":"61ec3a81787ff108528e02bb","nomineeId":"61ee8e65a95126c1ce6de41f"}`,
      },
    );
    const content = await rawResponse.json();
    console.log(content);
  })();
}
