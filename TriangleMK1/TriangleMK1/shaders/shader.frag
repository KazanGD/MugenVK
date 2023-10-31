#version 450

layout(location = 0) out vec4 outColor;
layout(binding = 1) uniform sampler2D texSampler;
layout(binding = 2) uniform sampler2D normSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragNormal;
layout(location = 2) in vec2 fragTexCoord;
layout(location = 3) in mat3 TBN;

void main()
{
	vec3 sunDir = normalize(vec3(-1,1,1));
	vec3 norm = texture(normSampler, fragTexCoord).rgb;
	norm = normalize(norm * 2.0 - 1.0);
	norm = normalize(TBN * norm);
	vec4 lighting = vec4(vec3(max(0.0, -dot(sunDir, norm))),1.0);
	outColor = texture(texSampler, fragTexCoord) * lighting;
	//outColor = vec4(fragNormal,1.0);
}