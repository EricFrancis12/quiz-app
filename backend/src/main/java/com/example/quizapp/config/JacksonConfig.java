package com.example.quizapp.config;

import java.io.IOException;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.introspect.Annotated;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setAnnotationIntrospector(new EmptyArrayJacksonAnnotationIntrospector());
        return mapper;
    }

    // Custom annotation introspector to replace null List with empty array
    public static class EmptyArrayJacksonAnnotationIntrospector extends JacksonAnnotationIntrospector {
        @Override
        public Object findNullSerializer(Annotated a) {
            if (List.class.isAssignableFrom(a.getRawType())) {
                return ArrayNullSerializer.INSTANCE;
            }
            return super.findNullSerializer(a);
        }
    }

    // Serializer to write empty array instead of null
    public static class ArrayNullSerializer extends StdSerializer<Object> {
        public static final ArrayNullSerializer INSTANCE = new ArrayNullSerializer();

        protected ArrayNullSerializer() {
            super(Object.class);
        }

        @Override
        public void serialize(Object value, JsonGenerator gen, SerializerProvider provider) throws IOException {
            gen.writeStartArray();
            gen.writeEndArray();
        }
    }

}
