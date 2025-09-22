# 🎥 Session Video Flow & Behavior
This explains how the Watch Page (`/watch/:sessionId`) and the `SmartVideoPlayer` work together with the backend API to handle workout sessions, video playback, and leaderboard eligibility.

## 🔄 End-to-End Flow
1. User Entry
   - User receives an email link to `/watch/:sessionId`.
   - Navigates to the page.

2. Authentication & Data Fetch
   - `page.tsx` checks if the user is authenticated.
   - If not → redirect to login → then back to `/watch/:sessionId`.
   - If authenticated → fetch session details from
GET `/api/v1/account/{accountId}/sessions/{sessionId}`.

Data returned (from SessionDto):
```json
{
  "sessionStartTime": "2025-09-22T10:00:00.000+0200",
  "sessionExecutionTime": null,
  "exerciseType": "HIP",
  "sessionStatus": "OVERDUE",
  "sessionVideoUrl": "https://youtu.be/-7mdU1-eEpk"
}
```

3. Rendering
   - Page renders three sections:
     - ⏱ Movement break (from CMS)
     - 🎥 Exercise video (`SmartVideoPlayer`)
     - 💬 Weekly quote (from CMS)

4. Video Playback & Eligibility
   - `SmartVideoPlayer`:
     - Checks whether current time is within 1 hour of `sessionStartTime`.
     - Displays eligibility banner (active ✅ vs expired ⏱).
     - Handles progress tracking via `ReactPlayer`.
     - Requires ≥ 90% watched before enabling “Mark as Done”.
     - Calls `PUT /sessions/{id}` to update session status when complete.

## 🟩 Session Status & UI States
| **`sessionStatus`** | **Frontend UI**                                                        | **Eligibility**             |
| --------------------------- | ---------------------------------------------------------------------- | --------------------------- |
| `NEW` + within 1h           | Green ✅ banner, video player, “Mark as Done” button (enabled at ≥ 90%) | ✅ Counts toward leaderboard |
| `NEW` + >1h expired         | Red ⏱ banner, video only (no button)                                   | ❌ No points                 |
| `COMPLETED`                 | 🏅 Success badge, “Nice work!” message, leaderboard link               | Already credited            |
| `OVERDUE`                   | Red ⏱ banner, video only, leaderboard link                             | ❌ No points                 |

## 📡 Backend Responses & Frontend Behavior
| **Response**                 | **When**                                        | **Frontend Behavior**                      | **Toast Message**                                                                                    |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **200 OK + JSON**            | Session marked completed within window          | `watchedState = true`, leaderboard updated | 🟢 *“Nice Work! Video successfully marked as completed.”*                                            |
| **204 No Content**           | Success without body (normal backend behavior)  | Handled safely, no crash                   | 🟢 Success (if in time) or ℹ️ Info (if overdue)                                                      |
| **409 Conflict**             | Session already finished (COMPLETED or OVERDUE) | No points, still watchable                 | ℹ️ *“This session is already closed. You can still watch the video, but no points will be awarded.”* |
| **400/401/403 Unauthorized** | Invalid/expired token                           | Error, nothing marked                      | 🔴 *“Failed to Save Progress. Unauthorized.”*                                                        |
| **404 Not Found**            | Invalid `sessionId` or wrong account            | Error                                      | 🔴 *“Failed to Save Progress. Session not found.”*                                                   |
| **500 Server Error**         | Unexpected backend failure                      | Error                                      | 🔴 *“Something went wrong. Please try again later.”*                                                 |

## ✅ QA Checklist
When testing, confirm these cases:

1. **Active session:** Play ≥90% → button enabled → PUT succeeds → success toast → points awarded.
2. **Expired session (>1h late):** Red banner, video only, no “Mark as Done” button.
3. **Completed session:** 🏅 badge + message, no button.
4. **Overdue session (from backend):** Red banner, no button, video watchable.
5. **Invalid sessionId:** Shows error toast.
6. **Backend 500:** Shows red error toast.

## ⚠️ Notes for Developers
- Do not assume JSON on all backend responses → handle 204 No Content safely.
- Eligibility logic is enforced by backend — frontend only reflects it.
- Toast messages are the user-facing feedback mechanism; always ensure they are clear and non-technical.
- Leaderboards update only when sessions are completed within the 1h window.