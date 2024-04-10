import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthSuccess } from '@/components/auth/auth-status'
import { RoleGate } from '@/components/auth/role-gate'

export const Admin = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole='ADMIN'>
          <AuthSuccess message='You are allowed to see this content!' />
        </RoleGate>
      </CardContent>
    </Card>
  )
}
