"""empty message

Revision ID: f466b8529b54
Revises: 9cad700b53bd
Create Date: 2021-12-12 20:37:08.885652

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'f466b8529b54'
down_revision = '9cad700b53bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('profiles_horoscope_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_children_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_orientation_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_gender_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_relationship_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_politic_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_religion_id_fkey', 'profiles', type_='foreignkey')
    op.drop_constraint('profiles_pet_id_fkey', 'profiles', type_='foreignkey')
    op.drop_column('profiles', 'about_me')
    op.drop_column('profiles', 'relationship_id')
    op.drop_column('profiles', 'image_url')
    op.drop_column('profiles', 'children_id')
    op.drop_column('profiles', 'moments')
    op.drop_column('profiles', 'education')
    op.drop_column('profiles', 'lat')
    op.drop_column('profiles', 'secrets')
    op.drop_column('profiles', 'horoscope_id')
    op.drop_column('profiles', 'drinking')
    op.drop_column('profiles', 'occupation')
    op.drop_column('profiles', 'orientation_id')
    op.drop_column('profiles', 'religion_id')
    op.drop_column('profiles', 'goal')
    op.drop_column('profiles', 'location')
    op.drop_column('profiles', 'lng')
    op.drop_column('profiles', 'talent')
    op.drop_column('profiles', 'user_audio')
    op.drop_column('profiles', 'hobbies')
    op.drop_column('profiles', 'pet_id')
    op.drop_column('profiles', 'needs')
    op.drop_column('profiles', 'smoking')
    op.drop_column('profiles', 'gender_id')
    op.drop_column('profiles', 'number_likes')
    op.drop_column('profiles', 'politic_id')
    op.drop_column('profiles', 'pronouns')
    op.drop_column('profiles', 'looking_for')
    op.drop_column('profiles', 'height')
    op.drop_column('profiles', 'my_traits')
    op.drop_column('relationships', 'updated_at')
    op.drop_column('relationships', 'created_at')
    op.drop_column('relationships', 'type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('relationships', sa.Column('type', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('relationships', sa.Column('created_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.add_column('relationships', sa.Column('updated_at', postgresql.TIMESTAMP(timezone=True), server_default=sa.text('now()'), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('my_traits', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('height', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('looking_for', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('pronouns', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('politic_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('number_likes', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('gender_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('smoking', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('needs', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('pet_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('hobbies', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('user_audio', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('talent', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('lng', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('location', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('goal', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('religion_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('orientation_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('occupation', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('drinking', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('horoscope_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('secrets', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('lat', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('education', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('moments', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('children_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('image_url', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('relationship_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('profiles', sa.Column('about_me', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.create_foreign_key('profiles_pet_id_fkey', 'profiles', 'pets', ['pet_id'], ['id'])
    op.create_foreign_key('profiles_religion_id_fkey', 'profiles', 'religions', ['religion_id'], ['id'])
    op.create_foreign_key('profiles_politic_id_fkey', 'profiles', 'politics', ['politic_id'], ['id'])
    op.create_foreign_key('profiles_relationship_id_fkey', 'profiles', 'relationships', ['relationship_id'], ['id'])
    op.create_foreign_key('profiles_gender_id_fkey', 'profiles', 'genders', ['gender_id'], ['id'])
    op.create_foreign_key('profiles_orientation_id_fkey', 'profiles', 'orientations', ['orientation_id'], ['id'])
    op.create_foreign_key('profiles_children_id_fkey', 'profiles', 'children', ['children_id'], ['id'])
    op.create_foreign_key('profiles_horoscope_id_fkey', 'profiles', 'horoscopes', ['horoscope_id'], ['id'])
    # ### end Alembic commands ###
