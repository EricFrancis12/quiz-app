package com.example.demo.middleware;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.demo.exception.UnauthorizedException;
import com.example.demo.service.AuthService;

@Aspect
@Component
public class AuthMiddleware {

    private final AuthService authService;

    @Autowired
    public AuthMiddleware(AuthService authService) {
        this.authService = authService;
    }

    @Pointcut("@annotation(com.example.demo.middleware.Auth)")
    public void authPointcut() {
    }

    @Before("authPointcut()")
    public void before(JoinPoint joinPoint) throws UnauthorizedException {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes();
        if (requestAttributes == null) {
            throw new RuntimeException("Unable to access request context");
        }
        authService.verify(requestAttributes.getRequest());
    }

}
