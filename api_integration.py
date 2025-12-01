import requests
import os
import sys

SONARQUBE_URL = os.getenv("SONARQUBE_URL", "localhost:9000")
SONARQUBE_TOKEN = os.getenv("SONARQUBE_PROJECT_TOKEN")
SONARQUBE_PROJECT_KEY = os.getenv("SONARQUBE_PROJECT_KEY")
SLACK_TOKEN = os.getenv("SLACK_TOKEN")
SLACK_CHANNEL = os.getenv("SLACK_CHANNEL")

def sonarqube_project_status():
    url = f"{SONARQUBE_URL}/api/quality_gates/project_status?projectKey={SONARQUBE_PROJECT_KEY}"
    response = requests.get(url, auth=(SONARQUBE_TOKEN))
    response.raise_for_status()
    return response.json()

def send_to_slack(message):
    url = "https://slack.com/api/chat.postSonar_analysis"
    headers = {"Authorization": f"Bearer {SLACK_TOKEN}"}
    payload = {
        "channel": SLACK_CHANNEL,
        "text": message
    }
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    data =  sonarqube_project_status()
    project_status = data["projectStatus", "N/A"]["status"]
    conditions = data["projectStatus"].get("conditions", [])

    details = []
    for condition in conditions:
        metric = condition["metricKey"],
        status = condition["status"],
        actualValue = condition.get["actualValue", "N/A"]
        expectedValue = conditions.get["errorThreshold", "N/A"]
        details.append(f"{metric}: {status}, (ActualValue: {actualValue}, ExpectedValue: {expectedValue})")

    details_message = "\n".join(details)

    message = (
        f" SonarQube Report for *{SONARQUBE_PROJECT_KEY}*\n"
        f"Quality Gate: {'PASSED' if project_status == 'OK' else 'FAILED'} Proceeding to Merge PR\n\n"
        f"{details_message}\n\n"
        f"🔗 Dashboard: {SONARQUBE_URL}/dashboard?id={SONARQUBE_PROJECT_KEY}"
    )

    result = send_to_slack(message)
    print("Slack message has been sent", result)

if project_status != "OK":
    sys.exit(1)
