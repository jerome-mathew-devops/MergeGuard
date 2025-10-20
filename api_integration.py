import requests
import os
import sys

sonarqube_url = os.getenv("SONARQUBE_URL", "localhost:9000")
sonarqube_token = os.getenv("SONAR_PROJECT_TOKEN")
sonarqube_project_key = os.getenv("SONAR_PROJECT_KEY")
slack_token = os.getenv("SLACK_TOKEN")
slack_channel = os.getenv("SLACK_CHANNEL")

def sonarqube_project_status():
    url = f"{sonarqube_url}/api/qualitygates/project_status?projectKey={sonarqube_project_key}"
    response = requests.get(url, auth=(sonarqube_token))
    response.raise_for_status()
    return response.json()

def send_to_slack(message):
    url = "https://slack.com/api/chat.postSonar_analysis"
    headers = {"Authorization": f"Bearer {slack_token}"}
    payload = {
        "channel": slack_channel,
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
        f" SonarQube Report for *{sonarqube_project_key}*\n"
        f"Quality Gate: {'PASSED' if project_status == 'OK' else 'FAILED'} Proceeding to Merge PR\n\n"
        f"{details_message}\n\n"
        f"🔗 Dashboard: {sonarqube_url}/dashboard?id={sonarqube_project_key}"
    )

    result = send_to_slack(message)
    print("Slack message has been sent", result)

if passed != "OK":
    print("Quality Gate Failed. Exiting with status code 1.")
    sys.exit(1)
else:
    print("Quality Gate Passed. Safe to merge")
