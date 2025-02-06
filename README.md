커밋 메시지 규칙
명확하고 체계적인 커밋 히스토리를 유지하기 위해 다음과 같은 커밋 메시지 접두사를 사용합니다.

[feat]: 새로운 기능 또는 기능 추가 시 사용
예제: [feat] Implement user login functionality
➡️ [feat] 사용자 로그인 기능 구현

[fix]: 버그 수정 시 사용
예제: [fix] Resolve issue with incorrect user profile display
➡️ [fix] 사용자 프로필 표시 오류 수정

[hotfix]: 긴급한 수정이 필요할 때 사용
예제: [hotfix] Patch security vulnerability in authentication
➡️ [hotfix] 인증 보안 취약점 패치

[design]: 디자인 요소 변경 또는 업데이트 시 사용
예제: [design] Update button styles on the homepage
➡️ [design] 홈페이지 버튼 스타일 업데이트

[refactor]: 기능 변경 없이 코드 구조를 개선할 때 사용
예제: [refactor] Simplify user service logic
➡️ [refactor] 사용자 서비스 로직 단순화

[chore]: 의존성 업데이트, CI/CD 설정 등 유지보수 작업 시 사용
예제: [chore] Update Next.js to latest version
➡️ [chore] Next.js 최신 버전으로 업데이트

[docs]: 문서 변경 또는 추가 시 사용
예제: [docs] Add API usage examples in README
➡️ [docs] README에 API 사용 예제 추가

[test]: 테스트 코드 추가 또는 개선 시 사용
예제: [test] Add unit tests for user service
➡️ [test] 사용자 서비스 단위 테스트 추가

[revert]: 이전 커밋을 되돌릴 때 사용
예제: [revert] Revert "[feat] Implement user login functionality"
➡️ [revert] "[feat] 사용자 로그인 기능 구현" 되돌리기

일반적인 가이드라인
간결하고 명확하게 작성: 커밋 메시지는 변경 사항을 명확하게 설명해야 합니다.
명령형 문장 사용: 명령하는 형태로 작성합니다.
✅ 올바른 예: [feat] Add signup form validation
❌ 잘못된 예: [feat] Added signup form validation
이슈 번호 또는 티켓 참조(필요 시): 관련된 이슈 번호를 포함하면 추적이 용이합니다.
예제: [fix] Resolve 404 error on login page (#123)
제목과 본문을 분리(선택 사항): 짧은 요약과 상세 설명을 공백 줄로 구분할 수 있습니다.****
